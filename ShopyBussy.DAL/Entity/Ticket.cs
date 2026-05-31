using System;
using System.Collections.Generic;
using System.Text;

namespace ShopyBussy.DAL.Entity
{
    public enum TicketType
    {
        Pending = 0,
        Completed = 1,
        Cancelled = 2,
    }

    public class Ticket : ITicket
    {
        public Guid Id { get; set; }
        public string TicketNumber { get; set; } = string.Empty;
        public Guid TripId { get; set; }

        public int BoardingStopId { get; set; }
        public int DropOffStopId { get; set; }

        public string PassengerFirstName { get; set; } = string.Empty;
        public string PassengerLastName { get; set; } = string.Empty;
        public string PassengerPhone { get; set; } = string.Empty;
        public string PassengerEmail { get; set; } = string.Empty;

        public string SeatNumber { get; set; } = string.Empty;

        public decimal Price { get; set; }
        public string Currency { get; set; } = "UAH";
        public TicketType Status { get; set; }

    }
}
