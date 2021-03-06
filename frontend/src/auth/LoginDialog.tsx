import * as React from 'react';
import { WithStyles, Theme, createStyles, withStyles, Dialog, DialogTitle, Divider, DialogContent, TextField, Tabs, Tab, DialogActions, Button } from '@material-ui/core';
import LoginForm from "./LoginForm";
import {RegistrationForm} from "./RegistrationForm";
import {authStore} from "./AuthStore";


const styles = (theme: Theme) => createStyles({
    dialogDivider: {
        marginBottom: theme.spacing.unit * 2
    }
})

interface IProps extends WithStyles<typeof styles> {
    isOpen: boolean,
    handleClose: any
}

const initialState = { tab: 0 }
type State = Readonly<typeof initialState>

class LoginDialog extends React.Component<IProps, State> {
    public state = initialState;

    public componentWillUnmount() {
        authStore.reset();
    }

    public render() {
        return (
            <Dialog open={this.props.isOpen} onClose={this.props.handleClose}>
                <Tabs value={this.state.tab} onChange={this.handleTabChange}>
                    <Tab label={"Login"}/>
                    <Tab label={"Register"} />
                </Tabs>
                {this.state.tab === 0 && <LoginForm/>}
                {this.state.tab === 1 && <RegistrationForm/>}
            </Dialog>
        )
    }

    private handleTabChange = (event: any, value: any) => this.setState({tab: value})
}

export default withStyles(styles)(LoginDialog);