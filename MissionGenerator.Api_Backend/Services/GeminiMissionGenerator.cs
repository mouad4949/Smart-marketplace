using System.Text.Json;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MissionGenerator.Api.DTOs;

namespace MissionGenerator.Api.Services;

// On implémente la même interface, ce qui nous permet de la substituer facilement.
public class GeminiMissionGenerator : IAiMissionGenerator
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private readonly string _systemPrompt;
    private readonly ILogger<GeminiMissionGenerator> _logger;

    public GeminiMissionGenerator(IConfiguration configuration, ILogger<GeminiMissionGenerator> logger, HttpClient httpClient)
    {
        _logger = logger;
        _httpClient = httpClient;
        _apiKey = configuration["Gemini:ApiKey"]!;
        if (string.IsNullOrEmpty(_apiKey))
        {
            throw new InvalidOperationException("Gemini API key is not configured.");
        }

        // Le prompt système est toujours dans appsettings.json
        _systemPrompt = configuration["OpenAI:SystemPrompt"]!;
    }

    public async Task<MissionDto?> GenerateMissionAsync(string userPrompt)
    {
        try
        {
            _logger.LogInformation("Sending request to Gemini API");

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        role = "user",
                        parts = new[]
                        {
                            new { text = $"{_systemPrompt}\n\n{userPrompt}" }
                        }
                    }
                },
                generationConfig = new
                {
                    temperature = 0.2,
                    candidateCount = 1,
                    maxOutputTokens = 2048,
                    responseMimeType = "application/json"
                }
            };

            var json = JsonSerializer.Serialize(requestBody);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key={_apiKey}";
            var response = await _httpClient.PostAsync(url, content);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                using var document = JsonDocument.Parse(responseContent);
                
                var jsonResponse = document.RootElement
                    .GetProperty("candidates")
                    .EnumerateArray()
                    .First()
                    .GetProperty("content")
                    .GetProperty("parts")
                    .EnumerateArray()
                    .First()
                    .GetProperty("text")
                    .GetString();

                _logger.LogInformation("Successfully received JSON response from Gemini.");
                
                return JsonSerializer.Deserialize<MissionDto>(jsonResponse!);
            }
            else
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                _logger.LogError("Gemini API returned error: {StatusCode} - {Content}", response.StatusCode, errorContent);
                return null;
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while calling Gemini API.");
            return null;
        }
    }
}