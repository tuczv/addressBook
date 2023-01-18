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


import java.util.*;
import javax.annotation.Generated;

/**
 * MailApiDto
 */

@JsonTypeName("Mail")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen")
public class MailApiDto {

  @JsonProperty("id")
  private UUID id;

  @JsonProperty("userTo")
  private String userTo;

  @JsonProperty("subject")
  private String subject;

  @JsonProperty("body")
  private String body;

  @JsonProperty("date")
  private String date;

  @JsonProperty("userFrom")
  private Object userFrom;

  public MailApiDto id(UUID id) {
    this.id = id;
    return this;
  }

  /**
   * Get id
   * @return id
  */
  @Valid 
  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public MailApiDto userTo(String userTo) {
    this.userTo = userTo;
    return this;
  }

  /**
   * Get userTo
   * @return userTo
  */
  
  public String getUserTo() {
    return userTo;
  }

  public void setUserTo(String userTo) {
    this.userTo = userTo;
  }

  public MailApiDto subject(String subject) {
    this.subject = subject;
    return this;
  }

  /**
   * Get subject
   * @return subject
  */
  
  public String getSubject() {
    return subject;
  }

  public void setSubject(String subject) {
    this.subject = subject;
  }

  public MailApiDto body(String body) {
    this.body = body;
    return this;
  }

  /**
   * Get body
   * @return body
  */
  
  public String getBody() {
    return body;
  }

  public void setBody(String body) {
    this.body = body;
  }

  public MailApiDto date(String date) {
    this.date = date;
    return this;
  }

  /**
   * Get date
   * @return date
  */
  
  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public MailApiDto userFrom(Object userFrom) {
    this.userFrom = userFrom;
    return this;
  }

  /**
   * Get userFrom
   * @return userFrom
  */
  
  public Object getUserFrom() {
    return userFrom;
  }

  public void setUserFrom(Object userFrom) {
    this.userFrom = userFrom;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    MailApiDto mail = (MailApiDto) o;
    return Objects.equals(this.id, mail.id) &&
        Objects.equals(this.userTo, mail.userTo) &&
        Objects.equals(this.subject, mail.subject) &&
        Objects.equals(this.body, mail.body) &&
        Objects.equals(this.date, mail.date) &&
        Objects.equals(this.userFrom, mail.userFrom);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, userTo, subject, body, date, userFrom);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class MailApiDto {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    userTo: ").append(toIndentedString(userTo)).append("\n");
    sb.append("    subject: ").append(toIndentedString(subject)).append("\n");
    sb.append("    body: ").append(toIndentedString(body)).append("\n");
    sb.append("    date: ").append(toIndentedString(date)).append("\n");
    sb.append("    userFrom: ").append(toIndentedString(userFrom)).append("\n");
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

