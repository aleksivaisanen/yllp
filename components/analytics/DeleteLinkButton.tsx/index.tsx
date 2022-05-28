import Button from "components/global/Button";
import { useRouter } from "next/router";
import { useState } from "react";

const DeleteButtonLink = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const deleteLink = async (slug: string) => {
    try {
      setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        disabled={loading}
        className="danger-button"
        onClick={() => deleteLink(slug)}
      >
        {loading ? "Loading..." : "Delete link"}
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
