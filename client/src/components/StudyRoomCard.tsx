import { Link } from "react-router-dom";

export const StudyRoomCard = ({
  title,
  members,
}: {
  title: string;
  members: number;
}) => (
  <div className="card bg-base-100 shadow-lg border border-primary/20 transition-all duration-300 hover:shadow-primary/30 hover:-translate-y-1">
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <p>{members} members</p>
      <div className="card-actions justify-end mt-4">
        <Link to="/room/123" className="btn btn-primary btn-sm">
          Enter Room
        </Link>
      </div>
    </div>
  </div>
);
