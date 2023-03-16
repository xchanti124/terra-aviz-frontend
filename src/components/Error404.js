import styles from "../styles/index.module.css";

const Error404 = () => {
  return (
    <div
      style={{
        fontSize: "var(--font-m)",
        color: "var(--gray-50)",
        width: "fit-content",
        marginInline: "auto",
        marginTop: "13rem",
      }}
    >
      Ups...something went wrong!
    </div>
  );
};

export default Error404;
