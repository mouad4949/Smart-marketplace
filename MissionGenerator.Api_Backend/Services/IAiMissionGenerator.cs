using MissionGenerator.Api.DTOs;

namespace MissionGenerator.Api.Services;

public interface IAiMissionGenerator
{
    Task<MissionDto?> GenerateMissionAsync(string userPrompt);
}