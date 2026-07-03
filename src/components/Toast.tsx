import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Toast.css';

export default function Toast() {
  const { state, dispatch } = useApp();
  if (!state.toast) return null;

  const icons = {
    success: <CheckCircle size={18} />,
    error: <AlertCircle size={18} />,
    info: <Info size={18} />,
  };

  return (
    <div className="toast-container">
      <div className={`toast toast--${state.toast.type}`}>
        {icons[state.toast.type]}
        <span>{state.toast.message}</span>
        <button
          onClick={() => dispatch({ type: 'SET_TOAST', payload: null })}
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

