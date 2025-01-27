"use client";
import * as React from "react";

import { NoteType } from "@/lib/types";
import { useAuth } from "./AuthContext";





interface NotesContextType {
  notes: NoteType[],
  isLoading: boolean,
  error: boolean,
  addNote: (noteData: string) => Promise<void>,
  deleteNote: (note: NoteType) => Promise<void>,
};

const NotesContext = React.createContext<NotesContextType|null>(null);



export const NotesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const { user } = useAuth();

  const [notes, setNotes] = React.useState<NoteType[]>([]);
  const [shouldFetchNewData, setShouldFetchNewData] = React.useState<boolean>(false);

  const [isLoading, setLoadingState] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);





  const refreshData = () => {
    setShouldFetchNewData(prev => !prev);
    setLoadingState(true);
    setError(false);
  };





  const addNote = async (noteData: string) => {
    if (!user) {
      return;
    }

    setLoadingState(true);
    setError(false);

    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        body: JSON.stringify({ userId: user._id, data: noteData })
      });

      if (res.status !== 201) {
        setError(true);
      }
      refreshData();
    }
    catch (error) {
      setError(true);
      setLoadingState(false);
    }
  };



  const deleteNote = async (note: NoteType) => {
    if (!user) {
      return;
    }

    try {
      const res = await fetch(`/api/notes/${note.userId}/${note._id}`, {
        method: "DELETE"
      });

      if (res.status !== 200) {
        setError(true);
      }
      refreshData();
    }
    catch (error) {
      setError(true);
      setLoadingState(false);
    }
  };



  const fetchNotes = React.useCallback(async () => {
    if (!user) {
      return;
    }

    try {
      const res = await fetch(`/api/notes/${user._id}`);

      if (res.status !== 200) {
        setError(true);
        return;
      }
      setNotes(await res.json());
    }
    catch (error) {
      setError(true);
    }
    finally {
      setLoadingState(false);
    }
  }, [user, shouldFetchNewData]);





  React.useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);





  return (
    <NotesContext.Provider value={{ notes, isLoading, error, addNote, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};





export const useNotes = (): NotesContextType => {
  const context = React.useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within an NotesProvider");
  }
  return context;
};