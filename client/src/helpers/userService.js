import authHeader from "./auth-header";

class UserService {
    getDashboard() {
        return fetch(
            '/api/admin/dashboard', {
                headers: authHeader()
            }
        );
    }



}

export default new UserService();