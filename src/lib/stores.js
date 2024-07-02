import { writable } from 'svelte/store';

export const wipIdeasStore = writable([]);

export const userStore = writable({
    username: '',
    user_id: 0,
    user_email: '',
    subscription_status: ''
});
