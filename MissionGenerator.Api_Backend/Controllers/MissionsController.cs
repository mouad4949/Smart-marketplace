using Microsoft.AspNetCore.Mvc;
using MissionGenerator.Api.DTOs;
using MissionGenerator.Api.Services;

namespace MissionGenerator.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MissionsController : ControllerBase
{
    private readonly IAiMissionGenerator _aiMissionGenerator;
    private readonly ILogger<MissionsController> _logger;

    public MissionsController(IAiMissionGenerator aiMissionGenerator, ILogger<MissionsController> logger)
    {
        _aiMissionGenerator = aiMissionGenerator;
        _logger = logger;
    }

    [HttpPost("generate")]
    public async Task<IActionResult> GenerateMission([FromBody] GenerateMissionRequest request)
    {
        if (string.IsNullOrWhiteSpace(request?.Description))
        {
            return BadRequest("Description cannot be empty.");
        }

        _logger.LogInformation("Generating mission for description: {Description}", request.Description);

        var mission = await _aiMissionGenerator.GenerateMissionAsync(request.Description);

        if (mission == null)
        {
            return StatusCode(500, "An error occurred while generating the mission.");
        }

        return Ok(mission);
    }
}