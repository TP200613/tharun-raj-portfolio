import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { soundFx } from '../utils/sound';

type AlgorithmType = 'bubble' | 'insertion' | 'selection' | 'quick';

interface AlgoInfo {
  name: string;
  bestTime: string;
  avgTime: string;
  worstTime: string;
  space: string;
  description: string;
}

const ALGO_DETAILS: Record<AlgorithmType, AlgoInfo> = {
  bubble: {
    name: 'Bubble Sort',
    bestTime: 'O(n)',
    avgTime: 'O(n²)',
    worstTime: 'O(n²)',
    space: 'O(1)',
    description: 'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.',
  },
  insertion: {
    name: 'Insertion Sort',
    bestTime: 'O(n)',
    avgTime: 'O(n²)',
    worstTime: 'O(n²)',
    space: 'O(1)',
    description: 'Builds the final sorted array one item at a time by inserting elements into their correct position.',
  },
  selection: {
    name: 'Selection Sort',
    bestTime: 'O(n²)',
    avgTime: 'O(n²)',
    worstTime: 'O(n²)',
    space: 'O(1)',
    description: 'Finds the minimum element from the unsorted sub-array and places it at the beginning.',
  },
  quick: {
    name: 'Quick Sort',
    bestTime: 'O(n log n)',
    avgTime: 'O(n log n)',
    worstTime: 'O(n²)',
    space: 'O(log n)',
    description: 'Divide-and-conquer algorithm that selects a "pivot" element and partitions the other elements into two sub-arrays.',
  },
};

const generateDefaultArray = (size: number) => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 85) + 15);
};

export const AlgorithmVisualizer: React.FC = () => {
  const arraySize = 24;
  const [array, setArray] = useState<number[]>(() => generateDefaultArray(arraySize));
  const [speed, setSpeed] = useState<number>(50);
  const [algorithm, setAlgorithm] = useState<AlgorithmType>('bubble');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);

  const isCancelledRef = useRef<boolean>(false);

  // Cancel any running animation on unmount
  useEffect(() => {
    return () => {
      isCancelledRef.current = true;
    };
  }, []);

  const generateRandomArray = useCallback(() => {
    isCancelledRef.current = true;
    setIsRunning(false);
    setActiveIndices([]);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);
    setArray(generateDefaultArray(arraySize));
  }, [arraySize]);

  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Bubble Sort
  const runBubbleSort = async () => {
    const arr = [...array];
    const n = arr.length;
    let comps = 0;
    let swp = 0;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (isCancelledRef.current) return;

        setActiveIndices([j, j + 1]);
        comps++;
        setComparisons(comps);
        soundFx.playBeep(200 + arr[j] * 6, 0.02);

        await sleep(speed);

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swp++;
          setSwaps(swp);
          setArray([...arr]);
          soundFx.playBeep(350 + arr[j] * 6, 0.02);
          await sleep(speed);
        }
      }
      setSortedIndices((prev) => [...prev, n - i - 1]);
    }
    setSortedIndices(Array.from({ length: n }, (_, idx) => idx));
    setActiveIndices([]);
    setIsRunning(false);
    soundFx.playSuccess();
  };

  // Insertion Sort
  const runInsertionSort = async () => {
    const arr = [...array];
    const n = arr.length;
    let comps = 0;
    let swp = 0;

    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      setActiveIndices([i]);
      await sleep(speed);

      while (j >= 0 && arr[j] > key) {
        if (isCancelledRef.current) return;
        comps++;
        setComparisons(comps);
        setActiveIndices([j, j + 1]);
        soundFx.playBeep(200 + arr[j] * 6, 0.02);

        arr[j + 1] = arr[j];
        swp++;
        setSwaps(swp);
        setArray([...arr]);
        j = j - 1;
        await sleep(speed);
      }
      arr[j + 1] = key;
      setArray([...arr]);
      setSortedIndices((prev) => Array.from(new Set([...prev, i])));
    }
    setSortedIndices(Array.from({ length: n }, (_, idx) => idx));
    setActiveIndices([]);
    setIsRunning(false);
    soundFx.playSuccess();
  };

  // Selection Sort
  const runSelectionSort = async () => {
    const arr = [...array];
    const n = arr.length;
    let comps = 0;
    let swp = 0;

    for (let i = 0; i < n; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        if (isCancelledRef.current) return;
        comps++;
        setComparisons(comps);
        setActiveIndices([minIdx, j]);
        soundFx.playBeep(200 + arr[j] * 6, 0.02);
        await sleep(speed);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        const temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        swp++;
        setSwaps(swp);
        setArray([...arr]);
        await sleep(speed);
      }
      setSortedIndices((prev) => [...prev, i]);
    }
    setSortedIndices(Array.from({ length: n }, (_, idx) => idx));
    setActiveIndices([]);
    setIsRunning(false);
    soundFx.playSuccess();
  };

  // Quick Sort
  const runQuickSort = async () => {
    const arr = [...array];
    let comps = 0;
    let swp = 0;

    const partition = async (low: number, high: number): Promise<number> => {
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        if (isCancelledRef.current) return -1;
        comps++;
        setComparisons(comps);
        setActiveIndices([j, high]);
        soundFx.playBeep(200 + arr[j] * 6, 0.02);
        await sleep(speed);

        if (arr[j] < pivot) {
          i++;
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          swp++;
          setSwaps(swp);
          setArray([...arr]);
          await sleep(speed);
        }
      }

      const temp = arr[i + 1];
      arr[i + 1] = arr[high];
      arr[high] = temp;
      swp++;
      setSwaps(swp);
      setArray([...arr]);
      setSortedIndices((prev) => [...prev, i + 1]);
      await sleep(speed);
      return i + 1;
    };

    const quickSortRecursive = async (low: number, high: number) => {
      if (low < high) {
        if (isCancelledRef.current) return;
        const pi = await partition(low, high);
        if (pi === -1) return;
        await quickSortRecursive(low, pi - 1);
        await quickSortRecursive(pi + 1, high);
      } else if (low >= 0 && high >= 0 && low === high) {
        setSortedIndices((prev) => [...prev, low]);
      }
    };

    await quickSortRecursive(0, arr.length - 1);
    setSortedIndices(Array.from({ length: arr.length }, (_, idx) => idx));
    setActiveIndices([]);
    setIsRunning(false);
    soundFx.playSuccess();
  };

  const handleStart = () => {
    isCancelledRef.current = false;
    setIsRunning(true);
    setActiveIndices([]);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);
    soundFx.playClick();

    if (algorithm === 'bubble') runBubbleSort();
    if (algorithm === 'insertion') runInsertionSort();
    if (algorithm === 'selection') runSelectionSort();
    if (algorithm === 'quick') runQuickSort();
  };

  const handleStop = () => {
    soundFx.playClick();
    isCancelledRef.current = true;
    setIsRunning(false);
  };

  const currentInfo = ALGO_DETAILS[algorithm];

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#ffffff] border border-[var(--theme-border)] shadow-md space-y-6">
      {/* Visualizer Controls */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-6 border-b border-[var(--theme-border)]">
        {/* Algorithm Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {(['bubble', 'insertion', 'selection', 'quick'] as AlgorithmType[]).map((type) => (
            <button
              key={type}
              onClick={() => {
                soundFx.playClick();
                setAlgorithm(type);
                generateRandomArray();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                algorithm === type
                  ? 'btn-theme-primary shadow-xs'
                  : 'bg-[#faf8f5] border border-[var(--theme-border)] text-[#57534e] hover:text-[#1c1917] hover:border-[var(--theme-primary)]'
              }`}
            >
              {ALGO_DETAILS[type].name}
            </button>
          ))}
        </div>

        {/* Action Buttons & Sliders */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-[#faf8f5] px-3 py-1.5 rounded-xl border border-[var(--theme-border)] text-xs">
            <span className="text-[#78716c] font-medium">Speed:</span>
            <input
              type="range"
              min="10"
              max="150"
              value={160 - speed}
              onChange={(e) => setSpeed(160 - Number(e.target.value))}
              disabled={isRunning}
              className="w-20 accent-[var(--theme-primary)] cursor-pointer"
            />
          </div>

          <button
            onClick={generateRandomArray}
            disabled={isRunning}
            className="p-2 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] text-[#57534e] hover:text-[#1c1917] hover:bg-[var(--theme-light)] transition-all disabled:opacity-50 cursor-pointer"
            title="Generate New Random Array"
          >
            <RotateCcw size={16} />
          </button>

          {isRunning ? (
            <button
              onClick={handleStop}
              className="px-4 py-2 rounded-xl bg-[#b91c1c] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Pause size={14} />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="px-5 py-2 rounded-xl btn-theme-primary text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Play size={14} />
              <span>Execute Algorithm</span>
            </button>
          )}
        </div>
      </div>

      {/* Visual Canvas Display Area */}
      <div className="h-64 sm:h-72 w-full bg-[#faf8f5] rounded-2xl border border-[var(--theme-border)] p-4 flex items-end justify-center gap-1 sm:gap-1.5 relative overflow-hidden">
        {array.map((val, idx) => {
          const isActive = activeIndices.includes(idx);
          const isSorted = sortedIndices.includes(idx);

          let barBg = 'bg-[var(--theme-primary)]';
          if (isSorted) barBg = 'bg-[#16a34a]';
          if (isActive) barBg = 'bg-[#ea580c] shadow-md';

          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center justify-end h-full"
            >
              <div
                className={`w-full rounded-t-md transition-all duration-75 ${barBg}`}
                style={{ height: `${val}%` }}
              />
            </div>
          );
        })}
      </div>

      {/* Metrics & Time Complexity Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] text-center">
          <div className="text-[11px] text-[#78716c] font-bold uppercase">Comparisons</div>
          <div className="text-xl font-heading font-bold text-[#1c1917]">{comparisons}</div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] text-center">
          <div className="text-[11px] text-[#78716c] font-bold uppercase">Array Swaps</div>
          <div className="text-xl font-heading font-bold text-[var(--theme-dark)]">{swaps}</div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] text-center">
          <div className="text-[11px] text-[#78716c] font-bold uppercase">Time Complexity</div>
          <div className="text-base font-mono font-bold text-[var(--theme-dark)]">{currentInfo.avgTime}</div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#faf8f5] border border-[var(--theme-border)] text-center">
          <div className="text-[11px] text-[#78716c] font-bold uppercase">Space Complexity</div>
          <div className="text-base font-mono font-bold text-[#15803d]">{currentInfo.space}</div>
        </div>
      </div>
    </div>
  );
};
