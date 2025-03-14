import React, { useState, useEffect, createContext, useContext } from "react";
import "./App.css";

// Create Context for User Data
const UserContext = createContext();

const App = () => {
  const [currentPage, setCurrentPage] = useState("main");
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, setCurrentPage }}>
      <div className="app-container">
        <h1 className="title">Bank App</h1>
        <Navigation />
        {currentPage === "main" && <Main />}
        {currentPage === "register" && <Register />}
        {currentPage === "services" && <Services />}
        {currentPage === "profile" && <Profile />}
        {currentPage === "transactions" && <Transactions />}
      </div>
    </UserContext.Provider>
  );
};

const Navigation = () => {
  const { setCurrentPage } = useContext(UserContext);
  return (
    <div className="navigation">
      <button className="nav-btn" onClick={() => setCurrentPage("main")}>Home</button>
      <button className="nav-btn" onClick={() => setCurrentPage("register")}>Register</button>
      <button className="nav-btn" onClick={() => setCurrentPage("services")}>Services</button>
      <button className="nav-btn" onClick={() => setCurrentPage("profile")}>Profile</button>
      <button className="nav-btn" onClick={() => setCurrentPage("transactions")}>Transactions</button>
    </div>
  );
};

const Main = () => {
  return (
    <div className="content">
      <h2>Welcome to the Bank App</h2>
      <p>Manage your banking services efficiently with our secure and easy-to-use platform.</p>
    </div>
  );
};

const Register = () => {
  const { user, setUser, setCurrentPage } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (user) {
      alert("You are already registered!");
      setCurrentPage("profile");
    }
  }, [user, setCurrentPage]);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setUser({ name, email });
    setCurrentPage("profile");
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <input type="text" className="input" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" className="input" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="input" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="password" className="input" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <button className="btn" onClick={handleRegister}>Submit</button>
    </div>
  );
};

const Services = () => {
  return (
    <div className="content">
      <h2>Banking Services</h2>
      <p>We provide a range of services including:</p>
      <ul>
        <li><strong>Fund Transfers:</strong> Transfer money securely between accounts.</li>
        <li><strong>Bill Payments:</strong> Pay your utility bills, mobile recharge, and more.</li>
        <li><strong>Loan Services:</strong> Apply for personal, home, or car loans.</li>
        <li><strong>Investment Options:</strong> Explore fixed deposits, mutual funds, and savings plans.</li>
        <li><strong>Credit and Debit Cards:</strong> Manage your card transactions and apply for new cards.</li>
      </ul>
    </div>
  );
};

const Profile = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="content">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user ? user.name : "No user registered"}</p>
      <p><strong>Email:</strong> {user ? user.email : "N/A"}</p>
      <p><strong>Account Type:</strong> Savings</p>
      <p><strong>Account Balance:</strong> $5,000</p>
    </div>
  );
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions([
      "Deposit: $500", 
      "Withdraw: $200",
      "Transfer: $150 to Savings Account",
      "Bill Payment: $75 - Electricity",
      "Online Purchase: $120",
      "Salary Credit: $2,000"
    ]);
  }, []);

  return (
    <div className="content">
      <h2>Transaction History</h2>
      <p>Here is a record of your recent transactions:</p>
      <ul>
        {transactions.map((t, index) => (
          <li key={index}>{t}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
