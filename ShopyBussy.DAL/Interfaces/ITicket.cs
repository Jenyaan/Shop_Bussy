namespace ShopyBussy.DAL.Entity
{
    public interface ITicket
    {
        int BoardingStopId { get; set; }
        string Currency { get; set; }
        int DropOffStopId { get; set; }
        Guid Id { get; set; }
        string PassengerEmail { get; set; }
        string PassengerFirstName { get; set; }
        string PassengerLastName { get; set; }
        string PassengerPhone { get; set; }
        decimal Price { get; set; }
        string SeatNumber { get; set; }
        TicketType Status { get; set; }
        string TicketNumber { get; set; }
        Guid TripId { get; set; }
    }
}