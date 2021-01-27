class AuthService {
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    getUsername() {
        const user = this.getCurrentUser()
        return user.admin.name;
    }

    logout() {
        localStorage.removeItem("user");
    }

    isAuthenticated() {
        if (localStorage.getItem('user')) {
            return true
        } else {
            return false
        }
    }
}

export default new AuthService();