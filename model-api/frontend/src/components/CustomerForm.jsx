import { useState } from "react";
import "./CustomerForm.css";

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
    const [loading, setLoading] = useState(false);

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
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8000/predict", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(request)

            });

            const data = await response.json();

            setPrediction(data.probability);
        } catch (error) {
            console.error("Prediction failed:", error);
        } finally {
            setLoading(false);
        }
    }

    function getRiskLevel(prob) {
        if (prob > 0.6) return "high";
        if (prob > 0.3) return "mid";
        return "low";
    }

    return (

        <form onSubmit={handleSubmit}>

            <h2 className="section-title full-width">Model</h2>

            <div className="field full-width">
                <label htmlFor="model" data-tooltip={"Model — модель машинного обучения\nMachine learning model"}>Model</label>
                <select
                    id="model"
                    value={request.model}
                    onChange={handleModelChange}
                >
                    <option value="catboost">CatBoost</option>
                    <option value="xgboost">XGBoost</option>
                    <option value="lightgbm">LightGBM</option>
                    <option value="random_forest">Random Forest</option>
                    <option value="logistic_regression">Logistic Regression</option>
                    <option value="stack_logreg">Stacking Logistic Regression</option>
                </select>
            </div>

            <h2 className="section-title full-width">Customer</h2>

            <div className="field">
                <label htmlFor="gender" data-tooltip={"Пол клиента\nCustomer gender"}>Gender</label>
                <select
                    id="gender"
                    name="gender"
                    value={request.customer.gender}
                    onChange={handleChange}
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>

            <div className="field">
                <label htmlFor="senior-citizen" data-tooltip={"Признак пожилого клиента (1 — да, 0 — нет)\nSenior citizen flag (1 — yes, 0 — no)"}>Senior Citizen</label>
                <select
                    id="senior-citizen"
                    name="SeniorCitizen"
                    value={request.customer.SeniorCitizen}
                    onChange={handleChange}
                >
                    <option value={0}>No</option>
                    <option value={1}>Yes</option>
                </select>
            </div>

            <div className="field">
                <label htmlFor="partner" data-tooltip={"Наличие партнёра\nWhether customer has a partner"}>Partner</label>
                <select
                    id="partner"
                    name="Partner"
                    value={request.customer.Partner}
                    onChange={handleChange}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>

            <div className="field">
                <label htmlFor="dependents" data-tooltip={"Наличие иждивенцев\nWhether customer has dependents"}>Dependents</label>
                <select
                    id="dependents"
                    name="Dependents"
                    value={request.customer.Dependents}
                    onChange={handleChange}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>

            <div className="field">
                <label htmlFor="tenure" data-tooltip={"Длительность пользования услугами (в месяцах)\nMonths of using the service"}>Tenure (months)</label>
                <input
                    id="tenure"
                    type="number"
                    min="0"
                    name="tenure"
                    value={request.customer.tenure}
                    onChange={handleChange}
                />
            </div>

            <div className="field">
                <label htmlFor="phone-service" data-tooltip={"Наличие телефонной связи\nWhether customer has phone service"}>Phone Service</label>
                <select
                    id="phone-service"
                    name="PhoneService"
                    value={request.customer.PhoneService}
                    onChange={handleChange}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>

            <div className="field">
                <label htmlFor="multiple-lines" data-tooltip={"Наличие нескольких телефонных линий\nWhether customer has multiple phone lines"}>Multiple Lines</label>
                <select
                    id="multiple-lines"
                    name="MultipleLines"
                    value={request.customer.MultipleLines}
                    onChange={handleChange}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No phone service">No phone service</option>
                </select>
            </div>

            <div className="field">
                <label htmlFor="internet-service" data-tooltip={"Тип интернет-подключения\nInternet connection type"}>Internet Service</label>
                <select
                    id="internet-service"
                    name="InternetService"
                    value={request.customer.InternetService}
                    onChange={handleChange}
                >
                    <option value="DSL">DSL</option>
                    <option value="Fiber optic">Fiber optic</option>
                    <option value="No">No</option>
                </select>
            </div>

            <div className="field">
                <label htmlFor="online-security" data-tooltip={"Подключена ли услуга интернет-безопасности\nWhether online security service is enabled"}>Online Security</label>
                <select
                    id="online-security"
                    name="OnlineSecurity"
                    value={request.customer.OnlineSecurity}
                    onChange={handleChange}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No internet service">No internet service</option>
                </select>
            </div>

            <div className="field">
                <label htmlFor="online-backup" data-tooltip={"Наличие онлайн-резервного копирования\nWhether online backup is enabled"}>Online Backup</label>
                <select
                    id="online-backup"
                    name="OnlineBackup"
                    value={request.customer.OnlineBackup}
                    onChange={handleChange}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No internet service">No internet service</option>
                </select>
            </div>

            <div className="field">
                <label htmlFor="device-protection" data-tooltip={"Наличие защиты устройства\nWhether device protection is enabled"}>Device Protection</label>
                <select
                    id="device-protection"
                    name="DeviceProtection"
                    value={request.customer.DeviceProtection}
                    onChange={handleChange}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No internet service">No internet service</option>
                </select>
            </div>

            <div className="field">
                <label htmlFor="tech-support" data-tooltip={"Наличие технической поддержки\nWhether tech support is enabled"}>Tech Support</label>
                <select
                    id="tech-support"
                    name="TechSupport"
                    value={request.customer.TechSupport}
                    onChange={handleChange}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No internet service">No internet service</option>
                </select>
            </div>

            <div className="field">
                <label htmlFor="streaming-tv" data-tooltip={"Наличие сервиса стримингового ТВ\nWhether streaming TV service is enabled"}>Streaming TV</label>
                <select
                    id="streaming-tv"
                    name="StreamingTV"
                    value={request.customer.StreamingTV}
                    onChange={handleChange}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No internet service">No internet service</option>
                </select>
            </div>

            <div className="field">
                <label htmlFor="streaming-movies" data-tooltip={"Наличие сервиса стриминга фильмов\nWhether streaming movies service is enabled"}>Streaming Movies</label>
                <select
                    id="streaming-movies"
                    name="StreamingMovies"
                    value={request.customer.StreamingMovies}
                    onChange={handleChange}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="No internet service">No internet service</option>
                </select>
            </div>

            <div className="field">
                <label htmlFor="contract" data-tooltip={"Тип контракта\nContract type"}>Contract</label>
                <select
                    id="contract"
                    name="Contract"
                    value={request.customer.Contract}
                    onChange={handleChange}
                >
                    <option value="Month-to-month">Month-to-month</option>
                    <option value="One year">One year</option>
                    <option value="Two year">Two year</option>
                </select>
            </div>

            <div className="field">
                <label htmlFor="paperless-billing" data-tooltip={"Используется ли электронный биллинг\nWhether paperless billing is enabled"}>Paperless Billing</label>
                <select
                    id="paperless-billing"
                    name="PaperlessBilling"
                    value={request.customer.PaperlessBilling}
                    onChange={handleChange}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
            </div>

            <div className="field">
                <label htmlFor="payment-method" data-tooltip={"Способ оплаты услуг\nPayment method for services"}>Payment Method</label>
                <select
                    id="payment-method"
                    name="PaymentMethod"
                    value={request.customer.PaymentMethod}
                    onChange={handleChange}
                >
                    <option value="Electronic check">Electronic check</option>
                    <option value="Mailed check">Mailed check</option>
                    <option value="Bank transfer (automatic)">Bank transfer (automatic)</option>
                    <option value="Credit card (automatic)">Credit card (automatic)</option>
                </select>
            </div>

            <div className="field">
                <label htmlFor="monthly-charges" data-tooltip={"Ежемесячная стоимость услуг\nMonthly service charges"}>Monthly Charges ($)</label>
                <input
                    id="monthly-charges"
                    type="number"
                    step="0.01"
                    min="0"
                    name="MonthlyCharges"
                    value={request.customer.MonthlyCharges}
                    onChange={handleChange}
                />
            </div>

            <div className="field">
                <label htmlFor="total-charges" data-tooltip={"Суммарные расходы клиента за всё время\nTotal customer charges over all time"}>Total Charges ($)</label>
                <input
                    id="total-charges"
                    type="number"
                    step="0.01"
                    min="0"
                    name="TotalCharges"
                    value={request.customer.TotalCharges}
                    onChange={handleChange}
                />
            </div>

            <div className="actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                        <>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                            Predicting...
                        </>
                    ) : (
                        <>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            Predict
                        </>
                    )}
                </button>
            </div>

            {prediction !== null && (
                <div className="result-wrapper">
                    <div className={`result result-${getRiskLevel(prediction)}`}>
                        <span className="result-label">Churn Risk</span>
                        <span className="result-value">{(prediction * 100).toFixed(1)}%</span>
                        <div className="result-progress">
                            <div
                                className="result-progress-bar"
                                style={{ width: `${prediction * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

        </form>
    );

}

export default CustomerForm;
