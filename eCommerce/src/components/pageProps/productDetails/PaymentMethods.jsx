import React, { useState } from "react";
import { visa, amex, mastercard, shipping } from "../../../assets/images";
import { TiPlus } from "react-icons/ti";
import { tarjetas, otherPaymentMethods } from "../../../constants";
import { motion, AnimatePresence } from "framer-motion";

const PaymentMethods = () => {
  const [viewPaymentMethods, setViewPaymentMethods] = useState(false);
  const handleViewPayment = () => {
    setViewPaymentMethods(!viewPaymentMethods);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1 cursor-pointer" onClick={handleViewPayment}>
        <div className="flex">
          <div className="w-[48px]">
            <img src={visa} alt="Visa" />
          </div>
          <div className="w-[48px]">
            <img src={amex} alt="Amex" />
          </div>
          <div className="w-[48px]">
            <img src={mastercard} alt="Mastercard" />
          </div>
          <div className="w-[48px] flex items-center">
            <TiPlus className="text-xl text-[#fc148c]" />
          </div>
        </div>
        <div>
          <p>
            <span className="font-bold">15% de descuento</span> pagando con
            transferencia bancaria
          </p>
        </div>
        <div className="underline">
          VER MEDIOS DE PAGO
          <AnimatePresence>
            {viewPaymentMethods && (
              <motion.div
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-wrap py-3 gap-2"
              >
                {tarjetas?.map((tarjeta) => (
                  <img key={tarjeta} className="w-14" src={tarjeta} alt="Tarjeta" />
                ))}
                {otherPaymentMethods?.map((payment) => (
                  <img key={payment} src={payment} className="w-14" alt="Payment Method" />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <img width={32} src={shipping} alt="Envío gratis" />
        <p>
          <span className="text-[#fc148c] font-bold">Envío Gratis</span> a todo el país.
        </p>
      </div>
    </div>
  );
};

export default PaymentMethods;
