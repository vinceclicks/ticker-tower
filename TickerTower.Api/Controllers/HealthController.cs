using Microsoft.AspNetCore.Mvc;

namespace TickerTower.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            status = "Healthy",
            app = "TickerTower.Api",
            timestamp = DateTime.UtcNow
        });
    }
}
