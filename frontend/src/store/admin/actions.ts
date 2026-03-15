import { api } from '@/api';
import { isAxiosError } from 'axios';
import { IUserProfileCreate, IUserProfileUpdate } from '@/interfaces';
import { State } from '../state';
import { AdminState } from './state';
import { getStoreAccessors } from 'typesafe-vuex';
import { commitSetUsers, commitSetUser } from './mutations';
import { commitAddNotification, commitRemoveNotification } from '../main/mutations';

type MainContext = {
    state: AdminState;
    rootState: State;
    commit: (...args: unknown[]) => unknown;
    dispatch: (...args: unknown[]) => Promise<unknown>;
    getters: Record<string, unknown>;
    rootGetters: Record<string, unknown>;
};

async function handleApiError(context: MainContext, error: unknown) {
    if (isAxiosError(error)) {
        await context.dispatch('checkApiError', error, { root: true });
    }
}

export const actions = {
    async actionGetUsers(context: MainContext) {
        try {
            const response = await api.getUsers(context.rootState.main.token);
            if (response) {
                commitSetUsers(context, response.data);
            }
        } catch (error) {
            await handleApiError(context, error);
        }
    },
    async actionUpdateUser(context: MainContext, payload: { id: number, user: IUserProfileUpdate }) {
        try {
            const loadingNotification = { content: 'saving', showProgress: true };
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.updateUser(context.rootState.main.token, payload.id, payload.user),
                new Promise<void>((resolve) => setTimeout(resolve, 500)),
            ]))[0];
            commitSetUser(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, { content: 'User successfully updated', color: 'success' });
        } catch (error) {
            await handleApiError(context, error);
        }
    },
    async actionCreateUser(context: MainContext, payload: IUserProfileCreate) {
        try {
            const loadingNotification = { content: 'saving', showProgress: true };
            commitAddNotification(context, loadingNotification);
            const response = (await Promise.all([
                api.createUser(context.rootState.main.token, payload),
                new Promise<void>((resolve) => setTimeout(resolve, 500)),
            ]))[0];
            commitSetUser(context, response.data);
            commitRemoveNotification(context, loadingNotification);
            commitAddNotification(context, { content: 'User successfully created', color: 'success' });
        } catch (error) {
            await handleApiError(context, error);
        }
    },
};

const { dispatch } = getStoreAccessors<AdminState | any, State>('');

export const dispatchCreateUser = dispatch(actions.actionCreateUser as any);
export const dispatchGetUsers = dispatch(actions.actionGetUsers as any);
export const dispatchUpdateUser = dispatch(actions.actionUpdateUser as any);
