export const fetchReservation = (reservationId) => {
    return $.ajax({
        url: `/api/reservations/${reservationId}`,
        method: 'GET'
    })
}

export const fetchReservations = () => {
    return $.ajax({
        url: `/api/reservations`,
        method: 'GET'
    })
}

export const createReservation = (reservation) => {
    return $.ajax({
        url: `/api/reservations`,
        method: 'POST',
        data: { reservation }
    })
}

export const updateReservation = (reservation) => {
    return $.ajax({
        url: `/api/reservations/${reservation.id}`,
        method: 'PATCH',
        data: { reservation }
    })
}

export const deleteReservation = (reservationId) => {
    return $.ajax({
        url: `/api/reservations/${reservationId}`,
        method: 'DELETE'
    })
}