import React, { useState, useEffect, useRef } from "react";

export default function NoteMenuDropdown({
  dropdownState,
  tags,
  setDropdownState,
  onDeleteNote,
  note,
  onUpdateNoteTag,
  checkedTags,
  setCheckedTags
}) {
  const modalRef = useRef();
  
  const deleteHandler = function (id) {
    if (confirm("Do you want to delete the note?")) {
      onDeleteNote(id);
    }
  };

  const handleTagChange = function (tagId) {
    const newCheckedTags = checkedTags.includes(tagId)
      ? checkedTags.filter((id) => id !== tagId)
      : [...checkedTags, tagId];
    setCheckedTags(newCheckedTags);
    onUpdateNoteTag(note.id, tagId);
  };

  useEffect(() => {
    setCheckedTags(note.tagList);
  }, [note]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setDropdownState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  if (dropdownState === "main") {
    return (
      <div className="dropdown-content" ref={modalRef}>
        <button
          className="dropdown-btn"
          type="button"
          onClick={() => deleteHandler(note.id)}
        >
          Delete
        </button>
        <button
          className="dropdown-btn"
          type="button"
          onClick={() => setDropdownState("tags")}
        >
          Edit tags
        </button>
      </div>
    );
  } else if (dropdownState === "tags") {
    return (
      <div className="dropdown-content" ref={modalRef}>
        {tags.map((tag) => (
          <label key={tag.id}>
            <input
              type="checkbox"
              checked={checkedTags.includes(tag.id)}
              onChange={() => handleTagChange(tag.id)}
            />
            {tag.name}
          </label>
        ))}
      </div>
    );
  }
}
