import React from "react";
import StripeCheckout from "react-stripe-checkout";

const PaymentButton = ({ component, amount, handleOrder }) => {
  const handleToken = (token) => {
    handleOrder();
    console.log(token);
  };

  return (
    <StripeCheckout
      token={handleToken}
      stripeKey="pk_test_TYooMQauvdEDq54NiTphI7jx"
      amount={amount}
      currency="USD"
      name="My Store"
      description="Purchase Description"
      image="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
    >
      {component}{" "}
    </StripeCheckout>
  );
};

export default PaymentButton;
