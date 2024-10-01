import React, { useState, useEffect } from "react";

const ContactForm = ({ handleSubmitContact }) => {
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [form, setForm] = useState({
        email: "",
    });
    const [errors, setErrors] = useState({
        email: "completar email",
    });

    useEffect(() => {
        // Si el formulario ha sido enviado y no hay errores, maneja el contacto
        if (formSubmitted && !errors.email) {
            handleSubmitContact(form.email);
            setFormSubmitted(false); // Restablecer formSubmitted después de enviar el formulario
        }
    }, [errors, formSubmitted]); // Vuelve a ejecutar el efecto cuando errors o formSubmitted cambian

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
        validate({ ...form, [name]: value });
      
    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
        validate({ ...form, [name]: value });
        setFormSubmitted(true); // Marcar el formulario como enviado
    };

 

    const validate = (form) => {
        let errors = {};
        if (!form.email) {
            errors.email = "Debes ingresar un email.";
        }
        if (form.email) {
            const emailRegex =
                /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            if (!emailRegex.test(form.email)) {
                errors.email = "El email ingresado no es válido";
            }
        }
        setErrors(errors);
    };

    return (
        <div>
            <div class="sm:col-span-4">
                <label
                    for="email"
                    class="block text-sm font-medium leading-6 text-gray-900"
                >
                    Correo Electronico
                </label>
                <div class="mt-2">
                    <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                            type="text"
                            name="email"
                            id="email"
                            onChange={handleChange}
                            onInput={handleInput}
                            value={form.email}
                            autoComplete="email"
                            class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Claudiogomez@gmail.com"
                        />
                    </div>
                    {formSubmitted && errors.email && (
                        <span className="text-sm text-red-500">{errors.email}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
