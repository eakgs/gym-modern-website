using NeonFit.Api.Models;


namespace NeonFit.Api.Services;


public class BookingService
{
private readonly List<BookingRequest> _bookings = new();


public Task<(bool Success, string Message)> BookAsync(BookingRequest req)
{
// naive capacity rule for demo
var count = _bookings.Count(b => b.ClassTitle == req.ClassTitle && b.Time == req.Time);
if (count >= 20) return Task.FromResult((false, "Class is full"));


_bookings.Add(req);
return Task.FromResult((true, $"Booked {req.ClassTitle} at {req.Time} for {req.MemberName}"));
}
}