// dynamic route for users profile pages

type Props = {
  params: { firstName: string };
};

export default function UserProfilePage({ params }: Props) {
  return (
    <div>
      <div>
        <h1>{params.firstName.toUpperCase()}'s Profile</h1>
      </div>
    </div>
  );
}
