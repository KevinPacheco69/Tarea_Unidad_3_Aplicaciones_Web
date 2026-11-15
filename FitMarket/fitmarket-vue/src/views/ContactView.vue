

<script setup>
import { ref, reactive } from "vue";
import { sendContactMessage } from "../services/contactService.js";

const form = reactive({
    name: "",
    email: "",
    subject: "",
    message: ""
});

const errors = reactive({
    name: "",
    email: "",
    subject: "",
    message: ""
});

const successMessage = ref("");
const serverError = ref("");
const isSending = ref(false);

const validateForm = () => {
    Object.keys(errors).forEach(key => {
        errors[key] = "";
    });

    let isValid = true;

    if (!form.name.trim()) {
        errors.name = "El nombre es obligatorio.";
        isValid = false;
    }

    if (!form.email.trim()) {
        errors.email = "El correo electrónico es obligatorio.";
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = "Introduce un correo electrónico válido.";
        isValid = false;
    }

    if (!form.subject.trim()) {
        errors.subject = "El asunto es obligatorio.";
        isValid = false;
    }

    if (!form.message.trim()) {
        errors.message = "El mensaje es obligatorio.";
        isValid = false;
    } else if (form.message.trim().length < 10) {
        errors.message = "El mensaje debe tener al menos 10 caracteres.";
        isValid = false;
    }

    return isValid;
};

const submitForm = async () => {
    successMessage.value = "";
    serverError.value = "";

    if (!validateForm()) {
        return;
    }

    isSending.value = true;

    try {
        const result = await sendContactMessage({
            name: form.name.trim(),
            email: form.email.trim(),
            subject: form.subject.trim(),
            message: form.message.trim()
        });

        successMessage.value =
            `${result.message} Número de registro: ${result.data.id}.`;

        Object.keys(form).forEach(key => {
            form[key] = "";
        });

    } catch (error) {
        serverError.value = error.message;

    } finally {
        isSending.value = false;
    }
};
</script>

<template>
    
    <section class="contact-section">
        <div class="contact-heading">
            <span class="section-label">ESTAMOS PARA AYUDARTE</span>

            <h1>Contáctanos</h1>

            <p>
                ¿Tienes alguna consulta sobre nuestros productos?
                Escríbenos y estaremos encantados de ayudarte.
            </p>
        </div>

        <form class="contact-form" @submit.prevent="submitForm" novalidate>
            <div class="form-group">
                <label for="name">Nombre completo</label>

                <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    placeholder="Escribe tu nombre"
                    autocomplete="name"
                    :aria-invalid="!!errors.name"
                    :aria-describedby="errors.name ? 'name-error' : undefined"
                />

                <small v-if="errors.name" id="name-error" class="error">
                    {{ errors.name }}
                </small>
            </div>

            <div class="form-group">
                <label for="email">Correo electrónico</label>

                <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    autocomplete="email"
                    :aria-invalid="!!errors.email"
                    :aria-describedby="errors.email ? 'email-error' : undefined"
                />

                <small v-if="errors.email" id="email-error" class="error">
                    {{ errors.email }}
                </small>
            </div>

            <div class="form-group">
                <label for="subject">Asunto</label>

                <input
                    id="subject"
                    v-model="form.subject"
                    type="text"
                    placeholder="Motivo de tu consulta"
                    :aria-invalid="!!errors.subject"
                    :aria-describedby="errors.subject ? 'subject-error' : undefined"
                />

                <small v-if="errors.subject" id="subject-error" class="error">
                    {{ errors.subject }}
                </small>
            </div>

            <div class="form-group">
                <label for="message">Mensaje</label>

                <textarea
                    id="message"
                    v-model="form.message"
                    rows="5"
                    placeholder="Escribe tu mensaje..."
                    :aria-invalid="!!errors.message"
                    :aria-describedby="errors.message ? 'message-error' : undefined"
                ></textarea>

                <small v-if="errors.message" id="message-error" class="error">
                    {{ errors.message }}
                </small>
            </div>

            <button
                 type="submit"
                class="submit-button"
                 :disabled="isSending"
>
                {{ isSending ? "Enviando..." : "Enviar mensaje" }}
            </button>
            <p
            v-if="serverError"
            class="error"
            role="alert"
            aria-live="assertive"
>
             {{ serverError }}
            </p>

            <p
                v-if="successMessage"
                class="success-message"
                role="status"
                aria-live="polite"
            >
                {{ successMessage }}
            </p>
        </form>
    </section>
</template>

<style scoped>
.contact-section {
    max-width: 850px;
    margin: 0 auto;
    padding: 60px 20px;
}

.contact-heading {
    margin-bottom: 35px;
    text-align: center;
}

.section-label {
    color: #a3e635;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 2px;
}

.contact-heading h1 {
    margin: 12px 0;
    color: white;
    font-size: 36px;
}

.contact-heading p {
    color: #aaa;
    line-height: 1.6;
}

.contact-form {
    padding: 30px;
    background: #1c1c1c;
    border: 1px solid #333;
    border-radius: 12px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 9px;
    margin-bottom: 22px;
}

.form-group label {
    color: #eee;
    font-weight: bold;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 13px;
    color: white;
    background: #111;
    border: 1px solid #444;
    border-radius: 7px;
    font: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: 2px solid #a3e635;
    border-color: #a3e635;
}

.form-group textarea {
    resize: vertical;
}

.form-group input[aria-invalid="true"],
.form-group textarea[aria-invalid="true"] {
    border-color: #ff8585;
}

.error {
    color: #ff8585;
}

.submit-button {
    width: 100%;
    padding: 14px;
    color: #171717;
    background: #a3e635;
    border: none;
    border-radius: 7px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
}

.submit-button:hover {
    background: #bef264;
}

.success-message {
    margin-top: 20px;
    padding: 14px;
    color: #a3e635;
    background: #29351b;
    border-radius: 7px;
    text-align: center;
}

@media (max-width: 480px) {
    .contact-form {
        padding: 20px;
    }

    .contact-heading h1 {
        font-size: 29px;
    }
}
</style>
