import { useState } from "react";

function CustomerForm() {

    const [request, setRequest] = useState({
        model: "catboost",
        customer: {
            gender: "Male",
            SeniorCitizen: 0,
            Partner: "No",
            Dependents: "No",
            tenure: 0,
            PhoneService: "Yes",
            MultipleLines: "No",
            InternetService: "DSL",
            OnlineSecurity: "No",
            OnlineBackup: "No",
            DeviceProtection: "No",
            TechSupport: "No",
            StreamingTV: "No",
            StreamingMovies: "No",
            Contract: "Month-to-month",
            PaperlessBilling: "Yes",
            PaymentMethod: "Electronic check",
            MonthlyCharges: 0,
            TotalCharges: 0,
        }
    });

    const [prediction, setPrediction] = useState(null);

    function handleChange(event) {

        const { name, value, type } = event.target;

        setRequest(prev => ({
            ...prev,
            customer: {
                ...prev.customer,
                [name]:
                    type === "number"
                        ? Number(value)
                        : value
            }
        }));
    }

    function handleModelChange(event) {

        setRequest(prev => ({
            ...prev,
            model: event.target.value
        }));
    }

    async function handleSubmit(event) {

        event.preventDefault();

        const response = await fetch("http://localhost:8000/predict", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(request)

        });

        const data = await response.json();

        setPrediction(data.probability);

    }

    return (

        <form onSubmit={handleSubmit}>

            <h2>Model</h2>

            <select
                value={request.model}
                onChange={handleModelChange}
            >
                <option value="catboost">CatBoost</option>
                <option value="xgboost">XGBoost</option>
                <option value="lightgbm">LightGBM</option>
                <option value="random_forest">Random Forest</option>
                <option value="logistic_regression">Logistic Regression</option>
                <option value="stack_logreg">Stacking Logistic Regression</option>
                <option value="stack_lightgbm">Stacking LightGBM</option>
            </select>

            <h2>Customer</h2>

            <label>Gender</label>

            <select
                name="gender"
                value={request.customer.gender}
                onChange={handleChange}
            >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>

            <label>Senior Citizen</label>

            <select
                name="SeniorCitizen"
                value={request.customer.SeniorCitizen}
                onChange={handleChange}
            >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
            </select>

            <label>Partner</label>

            <select
                name="Partner"
                value={request.customer.Partner}
                onChange={handleChange}
            >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>

            <label>Dependents</label>

            <select
                name="Dependents"
                value={request.customer.Dependents}
                onChange={handleChange}
            >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>

            <label>Tenure</label>

            <input
                type="number"
                name="tenure"
                value={request.customer.tenure}
                onChange={handleChange}
            />

            <label>Phone Service</label>

            <select
                name="PhoneService"
                value={request.customer.PhoneService}
                onChange={handleChange}
            >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>

            <label>Multiple Lines</label>

            <select
                name="MultipleLines"
                value={request.customer.MultipleLines}
                onChange={handleChange}
            >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="No phone service">No phone service</option>
            </select>

            <label>Internet Service</label>

            <select
                name="InternetService"
                value={request.customer.InternetService}
                onChange={handleChange}
            >
                <option value="DSL">DSL</option>
                <option value="Fiber optic">Fiber optic</option>
                <option value="No">No</option>
            </select>

            <label>Online Security</label>

            <select
                name="OnlineSecurity"
                value={request.customer.OnlineSecurity}
                onChange={handleChange}
            >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="No internet service">No internet service</option>
            </select>

            <label>Online Backup</label>

            <select
                name="OnlineBackup"
                value={request.customer.OnlineBackup}
                onChange={handleChange}
            >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="No internet service">No internet service</option>
            </select>

            <label>Device Protection</label>

            <select
                name="DeviceProtection"
                value={request.customer.DeviceProtection}
                onChange={handleChange}
            >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="No internet service">No internet service</option>
            </select>

            <label>Tech Support</label>

            <select
                name="TechSupport"
                value={request.customer.TechSupport}
                onChange={handleChange}
            >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="No internet service">No internet service</option>
            </select>

            <label>Streaming TV</label>

            <select
                name="StreamingTV"
                value={request.customer.StreamingTV}
                onChange={handleChange}
            >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="No internet service">No internet service</option>
            </select>

            <label>Streaming Movies</label>

            <select
                name="StreamingMovies"
                value={request.customer.StreamingMovies}
                onChange={handleChange}
            >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="No internet service">No internet service</option>
            </select>

            <label>Contract</label>

            <select
                name="Contract"
                value={request.customer.Contract}
                onChange={handleChange}
            >
                <option value="Month-to-month">Month-to-month</option>
                <option value="One year">One year</option>
                <option value="Two year">Two year</option>
            </select>

            <label>Paperless Billing</label>

            <select
                name="PaperlessBilling"
                value={request.customer.PaperlessBilling}
                onChange={handleChange}
            >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>

            <label>Payment Method</label>

            <select
                name="PaymentMethod"
                value={request.customer.PaymentMethod}
                onChange={handleChange}
            >
                <option value="Electronic check">Electronic check</option>
                <option value="Mailed check">Mailed check</option>
                <option value="Bank transfer (automatic)">Bank transfer (automatic)</option>
                <option value="Credit card (automatic)">Credit card (automatic)</option>
            </select>

            <label>Monthly Charges</label>

            <input
                type="number"
                step="0.01"
                name="MonthlyCharges"
                value={request.customer.MonthlyCharges}
                onChange={handleChange}
            />

            <label>Total Charges</label>

            <input
                type="number"
                step="0.01"
                name="TotalCharges"
                value={request.customer.TotalCharges}
                onChange={handleChange}
            />

            <button type="submit">
                Predict
            </button>

            {prediction !== null && (
                <h2>
                    Churn probability: {(prediction * 100).toFixed(2)}%
                </h2>
            )}

        </form>
    );

}

export default CustomerForm;