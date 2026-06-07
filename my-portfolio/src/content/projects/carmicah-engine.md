---
title: "Carmicah Engine"
description: "A custom 2D engine built from scratch to develop a 2D Game - SugarStrike"
publishDate: "2026-01-15"
tags: ["C++", "C#", "Mono", "Custom Engine", "ECS"]
youtubeVideoId: "i1VNaxWlPes"
itchGameId: "" 
isFeatured: true
---
## Overview
**Carmicah Engine** is a custom C++ 2D OpenGL game engine with C# Mono scripting integration developed during my sophomore year at Digipen (GAM 200). Built over 6 months, by a multidisciplinary team of 6 programmers and 2 artists, the engine was custom-architectured from scratch to develop **Sugar Strike**, a fast-paced, projectile-heavy tower defense game.

Navigating our first foray into engine development, the team had to overcome steep learning curves. As the Technical Lead, I focused on the core architecture, system integration and gameplay. Because our prior experience was primary in Unity, we heavily leveraged it's component-based workflow as a reference for our own design.

## Technical Overview
### Entity Component System (ECS)
One of the bonus requirements in our module was to implement a ECS. I took up this challenge as I foresaw that being a projectile-dense game with many enemies, it might help to have this. I utilized a contiguous, hole-free component array architecture mapped via entity IDs and bitset signatures, the system maximized CPU cache locality and minimized cache misses. This memory layout ensured that heavy systems like physics and rendering could efficiently iterate over hundreds of active entities simultaneously without performance bottlenecks, seamlessly bridging the user-friendly component workflow our team knew from Unity with high-performance C++ execution.

### C# Mono
To replicate the flexible workflow our team was accustomed to in Unity, I engineered a scripting subsystem by embedding the Mono Runtime API into our native C++ core. This allowed the team to write high-level gameplay logic such as tower behaviours and UI states in C# without risking native stability or enduring lengthy C++ recompile times.

Key elements of this implementation included:
* **Runtime & Assembly Management:** Handled the instantiation of the Mono root domain and the dynamic loading of the compiled C# scripting assembly (`.dll`), laying the framework for clean system separation and modular gameplay logic.
* **Native-to-Managed Interoperability:** Developed an internal thunking layer using Mono’s internal call system (`mono_add_internal_call`). This allowed optimized, bidirectional communication across the native/managed boundary, passing essential data like transform vectors, input states, and collision callbacks between C++ and C#.
* **ECS-to-Scripting Bridge:** Mapped the scripting lifecycle directly onto our custom C++ ECS. C# entities acted as lightweight wrappers holding matching entity IDs, allowing scripts to query components or handle life-cycle hooks (`OnCreate`, `OnUpdate`) while keeping heavy data allocations firmly inside the native C++ memory layout.

This architecture minimized development friction, allowing gameplay programmers to iterate rapidly on balance and design while keeping the core rendering and physics loops locked to high-performance C++ execution.

### Data-Driven Finite State Machine (FSM) System
To support complex enemy and tower artifical intelligence (AI) in Sugar Strike, I created a decoupled, data-driven FSM. This system operates globally across the custom ECS architecture, managing state graphs via a lightweight `StateMachine` component.

Key elements of this implementation include:
* **Component-Isolated Logic separation:** Designed the FSM to be purely behavior-driven. State definitions, timers, and transitions are cleanly packed inside the entity’s `StateMachine` component data, keeping the processing loop entirely cache-friendly and separated from individual script logic.
* **Event-Routed State Lifecycle Hooks:** Built automated transition logic tracking `EnterState`, `UpdateState`, and `ExitState` lifecycles. When an entity shifts states based on conditional target matching, the FSM dispatches specialized internal system messages (`OnStateEnterMsg`, `OnStateUpdateMsg`, `OnStateExitMsg`), allowing high-level C# scripts or native audio/animation engines to hook into lifecycle changes seamlessly without hard-coded dependencies.
* **Variant-Based Condition Evaluation:** Integrated a type-safe variant system (`variantVar`) allowing state transitions to react dynamically to fluid gameplay variables. This structural layout allowed designers to seamlessly set structural conditions on an entity from anywhere in the codebase to automatically route behavioral shifts.

<!-- ## Technical Overview
Here is where you can write about your system architecture in standard markdown. It supports **bold text**, `inline code arrays`, and block quotes easily. -->
