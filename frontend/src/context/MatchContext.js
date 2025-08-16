import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';

const MatchContext = createContext();

export const useMatch = () => useContext(MatchContext);

export const MatchProvider = ({ children }) => {
    const [matchData, setMatchData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true,
    });

    const fetchMatch = useCallback(async (matchId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await API.get(`/api/matches/${matchId}`);
            setMatchData(response.data);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to fetch match data.");
        } finally {
            setLoading(false);
        }
    }, []);
    
    const recordDelivery = useCallback(async (payload) => {
        // Here you don't need to set loading for every ball.
        // The UI can feel slow. Optimistic updates can be an option later.
        try {
            const response = await API.post('/api/scorecard/record-delivery', payload);
            setMatchData(response.data); // The backend returns the new state of the entire match
        } catch (err) {
            setError(err.response?.data?.error || "Failed to record delivery.");
            // You might want to refetch the match data here to resync on error
        }
    }, []);

  const undoLastDelivery = useCallback(async (inningId) => {
    if (!inningId) {
      setError("Cannot undo: Inning ID is missing.");
      return;
    }
    try {
        const response = await API.post(`/api/innings/${inningId}/undo`); // Route is correct
        setMatchData(response.data); 
    } catch (err) {
        setError(err.response?.data?.error || "Failed to undo last delivery.");
    }
  }, [API]);

   const selectNewBatter = useCallback(async (inningId, newBatterId, outBatterId) => {
        try {
            const response = await API.post(`/api/innings/${inningId}/new-batter`, { newBatterId, outBatterId });
            setMatchData(response.data);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to select new batter.");
        }
    }, [API]);

    const selectNewBowler = useCallback(async (inningId, newBowlerId) => {
        try {
            const response = await API.post(`/api/innings/${inningId}/new-bowler`, { newBowlerId });
            setMatchData(response.data);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to select new bowler.");
        }
    }, [API]);

    const startSecondInning = useCallback(async (matchId) => {
        try {
            const response = await API.post(`/api/matches/${matchId}/start-second-inning`);
            setMatchData(response.data);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to start second innings.");
        }
    }, [API]);

    const completeMatch = useCallback(async (matchId, result, winnerId) => {
        try {
            const response = await API.post(`/api/matches/${matchId}/complete`, { result, winnerId });
            setMatchData(response.data); // Update with the final match state
        } catch (err) {
            setError(err.response?.data?.error || "Failed to finalize match.");
        }
    }, [API]);


    const value = {
        matchData,
        loading,
        error,
        fetchMatch,
        recordDelivery,
        undoLastDelivery,
        selectNewBatter,
        selectNewBowler,
        completeMatch,
        startSecondInning,
        setMatchData
    };

    return <MatchContext.Provider value={value}>{children}</MatchContext.Provider>;
};