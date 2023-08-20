package com.github.tuczv.addressBook.api.dto;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import java.util.UUID;
import java.time.OffsetDateTime;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;


import java.util.*;
import jakarta.annotation.Generated;

/**
 * GroupApiDto
 */

@JsonTypeName("Group")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen")
public class GroupApiDto {

  @JsonProperty("id")
  private UUID id;

  @JsonProperty("name")
  private String name;

  @JsonProperty("user")
  private Object user;

  public GroupApiDto id(UUID id) {
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

  public GroupApiDto name(String name) {
    this.name = name;
    return this;
  }

  /**
   * Get name
   * @return name
  */
  
  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public GroupApiDto user(Object user) {
    this.user = user;
    return this;
  }

  /**
   * Get user
   * @return user
  */
  
  public Object getUser() {
    return user;
  }

  public void setUser(Object user) {
    this.user = user;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    GroupApiDto group = (GroupApiDto) o;
    return Objects.equals(this.id, group.id) &&
        Objects.equals(this.name, group.name) &&
        Objects.equals(this.user, group.user);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, user);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class GroupApiDto {\n");
    sb.append("    id: ").append(toIndentedString(id)).append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    user: ").append(toIndentedString(user)).append("\n");
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

