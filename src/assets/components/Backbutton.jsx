import '../styles/backbutton.css'
import { ArrowLeftToLine } from 'lucide-react';

function BackButton () {
    const handleClick = () => {
        window.history.back();
      };

    return(
        <button className="back-btn" onClick={handleClick}>
<ArrowLeftToLine size={30} strokeWidth={1.5} />        
<span className="back-text"  >VOLTAR</span>
      </button>
    )
}

export default BackButton;