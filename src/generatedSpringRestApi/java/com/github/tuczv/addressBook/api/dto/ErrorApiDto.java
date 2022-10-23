package com.github.tuczv.addressBook.api.dto;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import java.util.UUID;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * ErrorApiDto
 */

@JsonTypeName("Error")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen")
public class ErrorApiDto {

  @JsonProperty("id")
  private UUID id;

  @JsonProperty("code")
  private String code;

  @JsonProperty("timestamp")
  private Integer timestamp;

  @JsonProperty("message")
  private String message;

  public ErrorApiDto id(UUID id) {
    this.id = id;
    return this;
  }

  /**
   * Unique error ID, used for logging purposes, UUID format
   * @return id
  */
  @NotNull @Valid 
  @Schema(name = "id", description = "Unique error ID, used for logging purposes, UUID format", required = true)
  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public ErrorApiDto code(String code) {
    this.code = code;
    return this;
  }

  /**
   * A string coding the error type. This is given to caller so he can translate them if required.
   * @return code
  */
  @NotNull 
  @Schema(name = "code", description = "A string coding the error type. This is given to caller so he can translate them if required.", required = true)
  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  public ErrorApiDto timestamp(Integer timestamp) {
    this.timestamp = timestamp;
    return this;
  }

  /**
   * Get timestamp
   * @return timestamp
  */
  @NotNull 
  @Schema(name = "timestamp", required = true)
  public Integer getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(Integer timestamp) {
    this.timestamp = timestamp;
  }

  public ErrorApiDto message(String message) {
    this.message = message;
    return this;
  }

  /**
   * A short localized string that describes the error.
   * @return message
  */
  
  @Schema(name = "message", description = "A short localized string that describes the error.", required = false)
  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ErrorApiDto error = (ErrorApiDto) o;
    return Objects.equals(this.id, error.id) &&
        Objects.equals(this.code, error.code) &&
        Objects.equals(this.timestamp, error.timestamp) &&
        Objects.equals(this.message, error.message);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, code, timestamp, message);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ErrorApiDto {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    code: ").append(toIndentedString(code)).append("\n");
    sb.append("    timestamp: ").append(toIndentedString(timestamp)).append("\n");
    sb.append("    message: ").append(toIndentedString(message)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

