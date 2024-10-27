import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Protected({ Component }) {
  const navigate = useNavigate();
  useEffect(() => {
    var login = localStorage.getItem("isLogin");
    if (!login) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div>
      <Component />
    </div>
  );
}

export default Protected;
