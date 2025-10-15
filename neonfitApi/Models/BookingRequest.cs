namespace NeonFit.Api.Models;


public class BookingRequest
{
public required string ClassTitle { get; set; }
public required string Time { get; set; }
public required string MemberName { get; set; }
}