import "./index.scss";

interface LoaderProps {
  size?: "sm";
  isRemoveBg?: boolean;
}

export default function Loader(props: LoaderProps) {
  const { size, isRemoveBg } = props;

  return (
    <div className={`loader-container ${isRemoveBg ? "loader-remove-bg" : ""}`}>
      <div className={`lds-ring ${size}`}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
