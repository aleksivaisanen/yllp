type ButtonType = {
  children: JSX.Element | string;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
};

const Button = ({
  children,
  className,
  disabled = false,
  onClick,
}: ButtonType) => {
  return (
    <>
      <button
        className={className}
        onClick={() => onClick()}
        disabled={disabled}
      >
        {children}
      </button>
      <style jsx>{`
        button {
          color: var(--white);
          background-color: var(--primary);
          padding: 0.75rem;
          margin: 0.5rem;
          border-radius: 0.25rem;
          border: none;
        }

        button:hover {
          opacity: 0.8;
          cursor: pointer;
        }

        button:disabled,
        button[disabled] {
          background-color: var(--background);
          color: var(--white);
          cursor: auto;
        }
      `}</style>
    </>
  );
};

export default Button;
