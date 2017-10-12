package com.nagarro.ImageSharing.models;

import java.util.Date;

import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class ImageSharing {

	@Id
	private String id;

	private Binary image;

	@Indexed(name = "date", expireAfterSeconds = 0)
	private Date date;

	public ImageSharing() {
		super();
	}

	public ImageSharing(String id, Binary image, Date date) {
		super();
		this.id = id;
		this.image = image;
		this.date = date;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Binary getImage() {
		return image;
	}

	public void setImage(Binary image) {
		this.image = image;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

}
