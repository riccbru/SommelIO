import UserAPI from "../services/user";
import WinesAPI from "../services/wines";
import { useAuth } from "../hooks/useAuth";
import ScoringsAPI from "../services/scorings";
import TastingsAPI from "../services/tastings";
import ColleaguesAPI from "../services/colleagues";
import { createContext, useCallback, useEffect, useState } from "react";

type UserStats = {
	totalTastings: number;
	favoriteTastings: number;
	ratedTastings: number;
};

const defaultStats: UserStats = {
	totalTastings: 0,
	favoriteTastings: 0,
	ratedTastings: 0,
};

type Exam = Record<string, any>;

type Tasting = {
	tid: string;
	uid: string;
	full_name: string;
	wine_category_name: string;
	sample_number: string;
	wine_denomination: string;
	favorite: boolean;
	winemaker: string;
	alcohol_content: string;
	vintage: string;
	wine_temperature: string;
	ambient_temperature: string;
	tasting_date: string;
	tasting_time: string;
	tasting_location: string;
	created_at: string;
	updated_at: string;
	visual_exam: Exam;
	olfactory_exam: Exam;
	taste_olfactory_exam: Exam;
	final_considerations: Exam;
	scoring_evaluation: Exam;
};

type Coefficients = {
	visual_appearance: number;
	visual_color: number;
	olfactory_intensity: number;
	olfactory_complexity: number;
	olfactory_quality: number;
	taste_structure: number;
	taste_balance: number;
	taste_intensity: number;
	taste_persistence: number;
	taste_quality: number;
	harmony: number;
};

const defaultCoefficients: Coefficients = {
	harmony: 0,
	olfactory_complexity: 0,
	olfactory_intensity: 0,
	olfactory_quality: 0,
	taste_balance: 0,
	taste_intensity: 0,
	taste_persistence: 0,
	taste_quality: 0,
	taste_structure: 0,
	visual_appearance: 0,
	visual_color: 0,
};

type Wine = {
	wid: string;
	denomination: string;
	winemaker: string;
	vintage: number;
};

type Colleague = {
	status: string;
	created_at: string;
	rid: string;
	colleague: {
		premium: boolean;
		username: string;
		full_name: string;
		uid: string;
	};
};

type DataContextType = {
	loading: boolean;
	coefficients: Coefficients;
	stats: UserStats;
	tastings: Tasting[];
	wines: Wine[];
	colleagues: Colleague[];
	refreshCoefficients: () => Promise<void>;
	refreshStats: () => Promise<void>;
	refreshTastings: () => Promise<void>;
	refreshWines: () => Promise<void>;
	refreshColleagues: () => Promise<void>;
};

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { accessToken } = useAuth();
	const [loading, setLoading] = useState(false);
	const [wines, setWines] = useState<Wine[]>([]);
	const [tastings, setTastings] = useState<Tasting[]>([]);
	const [stats, setStats] = useState<UserStats>(defaultStats);
	const [colleagues, setColleagues] = useState<Colleague[]>([]);
	const [coefficients, setCoefficients] = useState<Coefficients>(defaultCoefficients);

	const refreshStats = useCallback(async () => {
		if (!accessToken) return;
		setLoading(true);
		try {
			const response = await UserAPI.getStats(accessToken);
			setStats(response.stats ?? defaultStats);
		} catch (err) {
			setStats(defaultStats);
			console.error("Error fetching stats:", err);
		} finally {
			setLoading(false);
		}
	}, [accessToken]);

	const refreshTastings = useCallback(async () => {
		if (!accessToken) return;
		setLoading(true);
		const delay = new Promise(resolve => setTimeout(resolve, 550));
		try {
			const [data] = await Promise.all([TastingsAPI.fetchTastings(), delay]);
			setTastings(data.tastings || []);
		} catch (err) {
			setTastings([]);
			console.error("Error fetching tastings:", err);
		} finally {
			setLoading(false);
		}
	}, [accessToken]);

	const refreshCoefficients = useCallback(async () => {
		if (!accessToken) return;
		try {
			const res = await ScoringsAPI.fetchCoefficients();
			setCoefficients(res.data || defaultCoefficients);
		} catch (err) {
			setCoefficients(defaultCoefficients);
			console.error("Error fetching coefficients:", err);
		}
	}, [accessToken]);

	const refreshWines = useCallback(async () => {
		if (!accessToken) return;
		setLoading(true);
		const delay = new Promise(resolve => setTimeout(resolve, 550));
		try {
			const [data] = await Promise.all([WinesAPI.fetchWines(), delay]);
			setWines(data.wines || []);
		} catch (err) {
			console.log(err);
			setWines([]);
		} finally {
			setLoading(false);
		}
	}, [accessToken]);

	const refreshColleagues = useCallback(async () => {
		if (!accessToken) return;
		setLoading(true);
		const delay = new Promise(resolve => setTimeout(resolve, 550));
		try {
			const [data] = await Promise.all([ColleaguesAPI.fetchColleagues(), delay]);
			setColleagues(data.colleagues || []);
		} catch (err) {
			setColleagues([]);
			console.log(err);
		} finally {
			setLoading(false);
		}
	}, [accessToken]);

	const refreshData = useCallback(async () => {
		setLoading(true);
		try {
			await Promise.all([
				refreshStats(),
				refreshTastings(),
				refreshWines(),
				refreshColleagues(),
			]);
		} finally {
			setLoading(false);
		}
	}, [refreshStats, refreshTastings, refreshWines, refreshColleagues]);

	useEffect(() => {
		refreshData();
		refreshCoefficients();
	}, [refreshData, refreshCoefficients]);

	const values = {
		loading,
		coefficients,
		stats,
		tastings,
		wines,
		colleagues,
		refreshCoefficients,
		refreshStats,
		refreshTastings,
		refreshWines,
		refreshColleagues,
	};

	return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};
