import {action, computed, observable, runInAction} from "mobx";
import authorized_api from "../utils/api";
import {userTeamService} from "./UserTeamService";

export interface NBAGame {
    readonly id: number;
    readonly nba_id: string;
    readonly season: number;
    readonly start_time_utc: string;
    readonly home_team: NBATeam;
    readonly visitor_team: NBATeam;
}

export interface PlayerGameStats {
    readonly game: NBAGame;
    readonly id: number;
    position: string;
    time_played: string;
    dnp: boolean;
    dnp_text: string;

    points: number;
    fgm: number;
    fga: number;
    ftm: number;
    fta: number;
    tpm: number;
    tpa: number;
    offReb: number;
    defReb: number;
    totReb: number;
    assists: number;
    pFouls: number;
    steals: number;
    turnovers: number;
    blocks: number;
    plusMinus: number;
}

export interface NBAPlayer {
    readonly id: number;
    readonly nba_id: number;
    readonly first_name: string;
    readonly last_name: string;
    readonly jersey: number;
    readonly position: string;
    readonly current_team: NBATeam;
    readonly next_game: NBAGame;
    readonly stats_prev_game: PlayerGameStats;
    readonly stats_games_timeseries: PlayerGameStats[];
}

export interface NBATeam {
    readonly id: number;
    readonly city: string;
    readonly name: string;
    readonly abbr: string;
}

export interface UserTeam {
    readonly id: number;
    name: string;
    players: NBAPlayer[];
}

class UserTeamStore {
    @observable inProgress = false;
    userTeams: Map<number, UserTeam> = observable.map(new Map<number, UserTeam>(), {deep: false});
    @observable.shallow allPlayers: NBAPlayer[] = [];

    @observable.shallow playersToAdd: NBAPlayer[] = [];
    @observable newTeamName: string = "";

    @computed get hasTeam() {
        return this.userTeams.size > 0;
    }

    @computed get defaultTeam() {
        return this.userTeams.values().next().value;
    }

    @action public setUserTeams(data: UserTeam[]) {
        data.forEach(team => this.userTeams.set(team.id, team));
    }

    @action public fetchUserTeams() {
        this.inProgress = true;
        userTeamService.fetchUserTeams()
            .then(resp => {
                runInAction("Set user teams",() => {
                    this.setUserTeams(resp.data);
                    this.inProgress = false;
                });
            })
    }

    @action public fetchAllPlayers() {

        userTeamService.fetchAllPlayers()
            .then(resp => {
                runInAction("Set all players", () => {
                    this.allPlayers = resp.data;
                })
            })
    }

    @action public submitAddPlayers(teamId: number) {
        const team = this.userTeams.get(teamId)!;
        const newTeam = new Set(team.players.concat(this.playersToAdd).map(player => player.id));
        this.inProgress = true;
        this.playersToAdd = [];
        userTeamUIStore.addPlayerDialogOpen = false;
        userTeamUIStore.editMode = false;
        userTeamService.updateUserTeam(teamId, Array.from(newTeam), team.name)
            .then(resp => {
                runInAction("Add players to team", () => {
                    this.userTeams.set(team.id, resp.data);
                    this.inProgress = false;
                })
            })
    }

    @action public removePlayer(playerId: number, teamId: number) {
        const team = this.userTeams.get(teamId)!;
        const oldTeam = team.players.slice();
        const newTeam = team.players.filter(p => p.id !== playerId);
        team.players = newTeam;
        userTeamService.updateUserTeam(teamId, newTeam.map(p => p.id), team.name)
            .then(resp => {
                runInAction("Remove players from team", () => {
                    this.userTeams.set(team.id, resp.data);
                });
            })
            .catch(reason => {
                runInAction("Remove players failed", () => {
                    team.players = oldTeam;
                    // TODO: error message
                })
            })
    }

    @action public createTeam() {
        userTeamUIStore.createTeamDialogOpen = false;
        const ids = this.playersToAdd.map(p => p.id);
        userTeamService.createUserTeam(ids, this.newTeamName)
            .then(resp => {
                runInAction("Create new team", () => {
                    this.userTeams.set(resp.data.id, resp.data);
                    this.newTeamName = "";
                    this.playersToAdd = [];
                    window.history.pushState(null, '', `/teams/${resp.data.id}`)
                })
            })
    }
}

class UserTeamUIStore {
    @observable editMode = false;
    @observable addPlayerDialogOpen = false;
    @observable createTeamDialogOpen = false;

}

export const userTeamStore = new UserTeamStore();
export const userTeamUIStore = new UserTeamUIStore();

