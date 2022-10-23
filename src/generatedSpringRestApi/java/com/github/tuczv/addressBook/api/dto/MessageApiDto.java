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
 * MessageApiDto
 */

@JsonTypeName("Message")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen")
public class MessageApiDto {

  @JsonProperty("id")
  private UUID id;

  @JsonProperty("author")
  private String author;

  @JsonProperty("text")
  private String text;

  @JsonProperty("date")
  private String date;

  @JsonProperty("subject")
  private String subject;

  public MessageApiDto id(UUID id) {
    this.id = id;
    return this;
  }

  /**
   * Get id
   * @return id
  */
  @Valid 
  @Schema(name = "id", required = false)
  public UUID getId() {
    return id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public MessageApiDto author(String author) {
    this.author = author;
    return this;
  }

  /**
   * Get author
   * @return author
  */
  
  @Schema(name = "author", required = false)
  public String getAuthor() {
    return author;
  }

  public void setAuthor(String author) {
    this.author = author;
  }

  public MessageApiDto text(String text) {
    this.text = text;
    return this;
  }

  /**
   * Get text
   * @return text
  */
  
  @Schema(name = "text", required = false)
  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public MessageApiDto date(String date) {
    this.date = date;
    return this;
  }

  /**
   * Get date
   * @return date
  */
  
  @Schema(name = "date", required = false)
  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public MessageApiDto subject(String subject) {
    this.subject = subject;
    return this;
  }

  /**
   * Get subject
   * @return subject
  */
  
  @Schema(name = "subject", required = false)
  public String getSubject() {
    return subject;
  }

  public void setSubject(String subject) {
    this.subject = subject;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    MessageApiDto message = (MessageApiDto) o;
    return Objects.equals(this.id, message.id) &&
        Objects.equals(this.author, message.author) &&
        Objects.equals(this.text, message.text) &&
        Objects.equals(this.date, message.date) &&
        Objects.equals(this.subject, message.subject);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, author, text, date, subject);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class MessageApiDto {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    author: ").append(toIndentedString(author)).append("\n");
    sb.append("    text: ").append(toIndentedString(text)).append("\n");
    sb.append("    date: ").append(toIndentedString(date)).append("\n");
    sb.append("    subject: ").append(toIndentedString(subject)).append("\n");
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

