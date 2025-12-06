import { User } from '../../../types/user';

type ReviewUserProps = {
  user: User;
}

function ReviewUser({ user }: ReviewUserProps): JSX.Element {
  return (
    <div className="reviews__user user">
      <div className="reviews__avatar-wrapper user__avatar-wrapper">
        <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
      </div>
      <span className="reviews__user-name">
        {user.name}
      </span>
    </div>
  );
}

export default ReviewUser;
