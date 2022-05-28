type TextInputType = {
  className?: string;
  error?: string;
  onChange: (value: string) => void;
  value: string;
};

const TextInput = ({ className, error, onChange, value }: TextInputType) => {
  const renderErrorMessage = (error?: string) => {
    if (!error) return null;

    return <p className="caption">{error}</p>;
  };

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(ev) => onChange(ev.target.value)}
        className={className}
      ></input>
      {renderErrorMessage(error)}
      <style jsx>{`
        input {
          padding: 0.5rem;
          min-width: 24rem;
        }
      `}</style>
    </>
  );
};

export default TextInput;
