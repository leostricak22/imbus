import Filter from "@/src/interface/Filter";

export type FilterManipulationProps = {
    setShowFilter: (showFilter: boolean) => void;
    setFilters: (filters: Filter[]) => void;
    role: string;
};

export default FilterManipulationProps;