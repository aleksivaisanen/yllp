import Button from "components/global/Button";
import { useRouter } from "next/router";

const DeleteButtonLink = ({ slug }: { slug: string }) => {
  const router = useRouter();

  const deleteLink = async (slug: string) => {
    try {
      const response = await fetch(`/api/v1/analytics/${slug}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Deletion successful, redirect user to front page
      if (response.status === 200) {
        alert("Deletion successful!");
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button className="danger-button" onClick={() => deleteLink(slug)}>
        Delete link
      </Button>
      <style jsx global>
        {`
          .danger-button {
            background-color: var(--error) !important;
            margin-bottom: 2rem !important;
          }
        `}
      </style>
    </>
  );
};

export default DeleteButtonLink;
