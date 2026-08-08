import "./App.css";
import CustomerForm from "./components/CustomerForm";

function App() {
    return (
        <div className="app">
            <div className="container">
                <div className="header">
                    <h1>Customer Churn Prediction</h1>
                    <p className="subtitle">Predict customer churn probability using machine learning models</p>
                </div>
                <CustomerForm />
            </div>
        </div>
    );
}

export default App;