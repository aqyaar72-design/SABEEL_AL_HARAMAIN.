document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("appointmentForm");
    const msg = document.getElementById("appointmentMsg");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const button = form.querySelector("button[type='submit']");

        button.disabled = true;
        button.textContent = "Waa la dirayaa...";

        const data = new FormData(form);

        // Samee Booking ID
        const randomPart = Math.random()
            .toString(36)
            .substring(2, 10)
            .toUpperCase();

        const bookingId = "SAH-" + randomPart;

        const serviceName = data.get("service");

        // Xogta booking-ka
        const payload = {
            booking_id: bookingId,

            full_name: data.get("name"),

            phone: data.get("phone"),

            whatsapp: data.get("phone"),

            email: data.get("email") || null,

            service_name: serviceName,

            pilgrims: Number(data.get("pilgrims") || 1),

            travel_date: data.get("date") || null,

            airport: data.get("airport") || null,

            hotel: data.get("hotel") || null,

            special_request: data.get("message") || null
        };

        console.log("SABEEL AL-HARAMAIN BOOKING:", payload);

        // Dir booking-ka Supabase
        const { error } = await supabaseClient
            .from("bookings")
            .insert(payload);

        if (error) {

            console.error(
                "SABEEL AL-HARAMAIN SUPABASE ERROR:",
                error
            );

            msg.textContent =
                "Waan ka xunnahay, codsiga lama dirin. Fadlan WhatsApp nagala soo xiriir.";

            msg.style.color = "#b42318";

            button.disabled = false;
            button.textContent = "Codsiga Dir";

            return;
        }

        // Guul
        msg.style.color = "#075b3b";

        msg.innerHTML = `
            Mahadsanid. Codsigaaga waa la helay.
            <br>
            <strong>Lambarka Ballanta: ${bookingId}</strong>
            <br>
            Fadlan sug inta aan kuu xaqiijineyno.
        `;

        // Nadiifi foomka
        form.reset();

        // WhatsApp
        const whatsappMessage =
            `Assalaamu Calaykum SABEEL AL-HARAMAIN%0A%0A` +
            `Waxaan soo diray codsi ballan.%0A%0A` +
            `Lambarka Ballanta: ${bookingId}%0A` +
            `Magac: ${payload.full_name}%0A` +
            `Adeeg: ${payload.service_name}%0A` +
            `Tirada dadka: ${payload.pilgrims}`;

        setTimeout(() => {

            window.open(
                `https://wa.me/917981977002?text=${whatsappMessage}`,
                "_blank"
            );

        }, 700);

        button.disabled = false;

        button.textContent = "Codsiga Dir";
    });
});