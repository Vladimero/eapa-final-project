// dynamic route for users profile pages

type Props = {
  params: { firstName: string; lastName: string };
};
export default function UserProfilePage({ params }: Props) {
  return (
    <div>
      <h2>
        This is the profile of {params.firstName} {params.lastName}
      </h2>
    </div>
  );
}
