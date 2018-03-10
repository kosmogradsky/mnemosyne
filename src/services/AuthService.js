import { ReplaySubject } from 'rxjs/ReplaySubject';

const authService = {
  _state: new ReplaySubject(1),
  updateUser(user) {
    this._state.next(user);
  },
};

authService.state = authService._state.asObservable();

export default authService;

