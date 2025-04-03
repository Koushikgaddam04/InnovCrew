// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const TestPage = () => {
//     const { id: testId } = useParams();  // Get test ID from URL
//     const navigate = useNavigate();
    
//     const [test, setTest] = useState(null);
//     const [answers, setAnswers] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchTest = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 if (!token) {
//                     setError("Unauthorized access. Please log in.");
//                     return;
//                 }

//                 const response = await axios.get(`http://localhost:7656/api/student/test/${testId}`, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });

//                 setTest(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching test:", error);
//                 setError("Failed to load test. Please try again later.");
//                 setLoading(false);
//             }
//         };

//         fetchTest();
//     }, [testId]);

//     const handleChange = (questionId, event) => {
//         setAnswers((prev) => ({ ...prev, [questionId]: event.target.value }));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const token = localStorage.getItem("token");
//             if (!token) {
//                 alert("Unauthorized access. Please log in.");
//                 return;
//             }

//             const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
//                 questionId,
//                 answer
//             }));

//             await axios.post(
//                 "http://localhost:7656/api/student/submit-test",
//                 { testId, answers: formattedAnswers },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             alert("Test submitted successfully!");
//             navigate("/student/tests");  // Redirect after submission
//         } catch (error) {
//             console.error("Error submitting test:", error);
//             alert("Failed to submit test. Please try again.");
//         }
//     };

//     if (loading) return <p>Loading test...</p>;
//     if (error) return <p style={{ color: "red" }}>{error}</p>;
//     if (!test) return <p>Test not found.</p>;

//     return (
//         <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
//             <h2>{test.title}</h2>
//             <form onSubmit={handleSubmit}>
//                 {test.questions.map((q, index) => (
//                     <div key={q._id} style={{ marginBottom: "15px" }}>
//                         <p><strong>Q{index + 1}:</strong> {q.question}</p>
//                         <textarea
//                             rows={q.type === "long" ? 4 : 2}
//                             style={{
//                                 width: "100%",
//                                 padding: "8px",
//                                 borderRadius: "5px",
//                                 border: "1px solid #ccc"
//                             }}
//                             onChange={(e) => handleChange(q._id, e)}
//                             required
//                         />
//                     </div>
//                 ))}
//                 <button type="submit" style={{
//                     padding: "10px 16px",
//                     background: "blue",
//                     color: "white",
//                     border: "none",
//                     cursor: "pointer",
//                     borderRadius: "5px",
//                     fontSize: "16px"
//                 }}>
//                     Submit Test
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default TestPage;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TestPage = () => {
    const { id } = useParams();  // Get test ID from URL
    const navigate = useNavigate();
    const [test, setTest] = useState(null);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:7656/api/student/test/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTest(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching test:", error);
                alert("Failed to load test.");
                setLoading(false);
            }
        };
        fetchTest();
    }, [id]);

    const handleChange = (question, event) => {
        setAnswers({ ...answers, [question]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const studentId = localStorage.getItem("studentId"); // Ensure this is stored during login

            await axios.post("http://localhost:7656/api/student/submit-test", {
                studentId,
                testId: id,
                answers: Object.entries(answers).map(([question, answer]) => ({ question, answer }))
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Test submitted successfully!");
            navigate("/student/tests");  // Redirect after submission
        } catch (error) {
            console.error("Error submitting test:", error);
            alert("Failed to submit test.");
        }
    };

    if (loading) return <p>Loading test...</p>;
    if (!test) return <p>Test not found.</p>;

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2>{test.title}</h2>
            <form onSubmit={handleSubmit}>
                {test.questions.map((q, index) => (
                    <div key={index} style={{ marginBottom: "15px" }}>
                        <p><strong>Q{index + 1}:</strong> {q.question}</p>
                        <textarea
                            rows={q.type === "long" ? 4 : 2}
                            style={{ width: "100%", padding: "5px" }}
                            onChange={(e) => handleChange(q.question, e)}
                            required
                        />
                    </div>
                ))}
                <button type="submit" style={{ padding: "8px 16px", background: "blue", color: "white", border: "none", cursor: "pointer" }}>
                    Submit Test
                </button>
            </form>
        </div>
    );
};

export default TestPage;
