type ButtonType = {
  children: JSX.Element | string;
  className?: string;
  onClick: () => void;
};

const Button = ({ children, className, onClick }: ButtonType) => {
  return (
    <>
      <button className={className} onClick={() => onClick()}>
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
          background-color: var(--primary-dark);
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Button;
