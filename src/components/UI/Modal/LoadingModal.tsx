import { useSelector } from "react-redux";
import "./LoadingModal.css";
interface LoadingModalProps {
  message: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ message }) => {
  const isLoading = useSelector((state: any) => state.loading.isLoading);
  return (
    isLoading && (
      <div
        className="loading-modal"
        style={{
          display: isLoading ? "flex" : "none",
        }}
      >
        <div className="loading-spinner"></div>
        <h2>{message}</h2>
      </div>
    )
  );
};

export default LoadingModal;
